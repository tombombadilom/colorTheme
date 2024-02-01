#!/usr/bin/env bash
# Parse command line arguments
NODE=21
MODE="development"
username="www-data"
for i in "$@"
do
case $i in
    --user=*)
    username="${i#*=}"
    shift # past argument=value
    ;;
    --node=*)
    NODE="${i#*=}"
    shift # past argument=value
    ;;
    --mode=*)
    MODE="${i#*=}"
    shift # past argument=value
    ;;
    *)
    # unknown option
    ;;
esac
done
# Function to install shellcheck if it's not already installed
function install_shellcheck() {
    if ! command -v shellcheck &>/dev/null; then
        echo "Installing shellcheck..."
        # Checking the Linux distribution and installing shellcheck accordingly
        if [[ "$(uname -s)" == "Linux" ]]; then
            if [[ -f "/etc/debian_version" ]] || [[ -f "/etc/lsb-release" ]]; then
                # Debian or Ubuntu
                apt-get install -y shellcheck
            elif [[ -f "/etc/alpine-release" ]]; then
                # Alpine
                apk add --no-cache shellcheck
            elif [[ -f "/etc/os-release" ]]; then
                # Other Linux distributions
                # shellcheck disable=SC1091
                source /etc/os-release
                if [[ "$ID" == "ubuntu" || "$ID" == "debian" ]]; then
                    apt-get install -y shellcheck
                elif [[ "$ID" == "alpine" ]]; then
                    apk add --no-cache shellcheck
                else
                    echo "Unsupported Linux distribution."
                    exit 1
                fi
            else
                echo "Unsupported Linux distribution."
                exit 1
            fi
        elif [[ "$(uname -s)" == "Darwin" ]]; then
            # macOS
            brew install shellcheck
        else
            echo "Unsupported operating system."
            exit 1
        fi
    fi
}

# Calling the install_shellcheck function to install shellcheck
install_shellcheck

export NVM_DIR="$HOME/.nvm"
# Load nvm
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# Load nvm bash_completion
# shellcheck disable=SC1091
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Prompting the user to enter a username (default: www-data)
# shellcheck disable=SC2162

if [[ -z $username ]]; then
    read -p "Enter the username (default: www-data): " username
fi
username=${username:-www-data}

# Using a specific version of Node.js
nvm use $NODE

# Installing pnpm globally
pnpm add -g pnpm

# Pulling the latest changes from git
git pull

# Installing dependencies
pnpm install

# Building the project
pnpm build

# Copying the _htaccess file to the build directory
cp _htaccess build/.htaccess

# Setting ownership and permissions for the build directory
chown -R "$username":"$username" dist
chmod 755 dist

# Prompting the user to choose whether to delete the node_modules directory or not
# shellcheck disable=SC2162
read -p "Do you want to delete the node_modules directory? (Y/n): " delete_node_modules
delete_node_modules=${delete_node_modules:-Y}

# Deleting the node_modules directory if the user chooses to
if [[ $delete_node_modules =~ ^[Yy]$ ]]; then
    rm -rf node_modules
fi