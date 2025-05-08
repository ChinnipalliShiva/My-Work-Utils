read -p "Enter Profile Name : " profile_name
export AWS_PROFILE=$profile_name
aws_credentials_file="$HOME/.aws/credentials"
temp_file="temp.json"

# Cleanup temp file on exit
trap "rm -f $temp_file" EXIT

# Check if AWS credentials file exists
if [ ! -f "$aws_credentials_file" ]; then
    echo "Error: AWS credentials file not found."
    exit 1
fi
echo "Found credentials file."
sed -i '/\[temp\]/,/^$/d' "$aws_credentials_file"

# Extract MFA ARN
mfa_arn=$(awk '/\[mfa_arn\]/{getline; print}' "$aws_credentials_file" | cut -d'=' -f2 | xargs)
if [ -z "$mfa_arn" ]; then
    echo "Error: MFA ARN not found in credentials file."
    exit 1
fi
echo "MFA ARN: found in credentials file."

# Prompt for user input and validate
while true; do
    read -p "Enter 6-digit MFA Code: " mfa_code
    if [[ "$mfa_code" =~ ^[0-9]{6}$ ]]; then
        break
    else
        echo "Error: MFA Code must be exactly 6 digits."
    fi
done

# Validate input
if [ -z "$mfa_code" ]; then
    echo "Error: MFA Code are required."
    exit 1
fi

# Get session token
aws sts get-session-token --serial-number "$mfa_arn" --token-code "$mfa_code" >"$temp_file"

if [ $? -ne 0 ]; then
    echo "Error: Failed to get session token."
    exit 1
fi

# Extract credentials
aws_access_key_id=$(awk -F'"' '/AccessKeyId/{print $4}' "$temp_file")
aws_secret_access_key=$(awk -F'"' '/SecretAccessKey/{print $4}' "$temp_file")
aws_session_token=$(awk -F'"' '/SessionToken/{print $4}' "$temp_file")

if [ -z "$aws_access_key_id" ] || [ -z "$aws_secret_access_key" ] || [ -z "$aws_session_token" ]; then
    echo "Error: Failed to parse JSON response."
    exit 1
fi

# Update AWS credentials file
sed -i '/\[temp\]/q' "$aws_credentials_file"
{
    echo -e "\n\n[temp]"
    echo "aws_access_key_id = $aws_access_key_id"
    echo "aws_secret_access_key = $aws_secret_access_key"
    echo "aws_session_token = $aws_session_token"
} >>"$aws_credentials_file"
echo "Temporary credentials added under [temp] profile."
