Delete cert.pem from Git Repositories
This Node.js script automates the process of locating and deleting cert.pem files from multiple Git repositories stored in a specified directory. It creates a new branch, deletes the file, commits the change, and pushes it to the remote repository. Logs are saved to a logger.txt file.

📁 Directory Structure
perl
Copy
Edit
your-project/
├── delete-cert.js # Main script
├── logger.txt # Generated log file
├── myGitRepos/ # Folder containing your Git repositories
│ ├── repo1/
│ ├── repo2/
│ └── ...
└── README.md
🔧 Prerequisites
Node.js (v12 or higher)

Git installed and accessible from the command line

All target repositories must:

Have a master branch

Be properly cloned and accessible locally in the myGitRepos folder

Use origin as the remote name

📦 Install Dependencies
Install the required npm package:

bash
Copy
Edit
npm install simple-git
🚀 How to Use
Clone or copy this script into a working directory.

Place all your Git repositories inside the myGitRepos/ folder.

Run the script:

bash
Copy
Edit
node delete-cert.js
Check logger.txt for the summary of operations and any errors.

📝 What It Does
For each repository in myGitRepos/, the script will:

Checkout the master branch

Pull the latest changes

Create a new branch called delete_cert

Recursively search for a cert.pem file

Delete the file if found

Commit and push the change to the delete_cert branch

Log the result to logger.txt
