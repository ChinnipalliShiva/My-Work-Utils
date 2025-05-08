Shell Script for Setting Up Temporary AWS Credentials
Prerequisites:
1.Save your AWS credentials in the ~/.aws/credentials file as follows:
[default]
aws_access_key_id = QWERTYUIOPLKJHGFD
aws_secret_access_key = QWERTYUIOP,MNBVCXASDFGHJKLUHGVC

[neoscript]
aws_access_key_id = MNBVCZXGUIOPOKJN
aws_secret_access_key = OIUYTRASDFGHJKLMNBVCASDFGHJKLIUY

[mfa_arn]
arn = arn:aws:iam::1234567890:mfa/user_name
Ensure the [mfa_arn] section is saved in the same file with the correct ARN format (arn:aws:iam::1234567890:mfa/user_name).

Steps to Run the Script:
1.Navigate to the Project Directory:
2.Open Git Bash (or any terminal) in the project directory.
3.Run the Script:
sh filename.sh
4.Enter Profile Name:
You will be prompted to enter the profile name (e.g., default, neoscript).
5.Enter MFA Code:
You will be prompted to enter the 6-digit MFA code. 6. If there are any errors, you will be exited from the script and error will be consoled in terminal
7.Setting Your New Temporary Profile:
export AWS_PROFILE=temp
