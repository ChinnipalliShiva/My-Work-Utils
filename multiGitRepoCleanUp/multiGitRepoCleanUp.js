const fs = require("fs");
const path = require("path");
const simpleGit = require("simple-git");

const rootDir = path.resolve(__dirname, "myGitRepos");
const loggerPath = path.join(__dirname, "logger.txt");

// Initialize logger
fs.writeFileSync(loggerPath, "Delete Cert Script Log\n", "utf8");

async function logMessage(message) {
  fs.appendFileSync(
    loggerPath,
    `${new Date().toISOString()} - ${message}\n`,
    "utf8"
  );
}

async function processRepo(repoPath) {
  const git = simpleGit(repoPath);

  try {
    await git.checkout("master");
    await git.pull();

    const branchName = "delete_cert";
    await git.checkoutLocalBranch(branchName);

    const certPath = await findCertFile(repoPath);

    if (certPath) {
      fs.unlinkSync(certPath);
      await git.add(certPath);
      await git.commit("Deleted cert.pem file");
      await git.push("origin", branchName);
      await logMessage(
        `${repoPath} - cert.pem deleted and pushed to ${branchName}`
      );
    } else {
      await logMessage(`${repoPath} - cert.pem not found.`);
    }
  } catch (error) {
    await logMessage(`${repoPath} - Error: ${error.message}`);
  }
}

async function findCertFile(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      const found = await findCertFile(fullPath);
      if (found) return found;
    } else if (file.name === "cert.pem") {
      return fullPath;
    }
  }

  return null;
}

async function main() {
  const repos = fs.readdirSync(rootDir);

  for (const repo of repos) {
    const repoPath = path.join(rootDir, repo);

    if (fs.statSync(repoPath).isDirectory()) {
      await processRepo(repoPath);
    }
  }

  console.log("Process completed. Check logger.txt for details.");
}

main();
