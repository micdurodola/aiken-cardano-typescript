# Aiken-cardano-typescript

Aiken-cardano-typescript is an application that demonstrates how to create and manage smart contracts on the Cardano blockchain. The backend is implemented using Aiken, while the frontend is developed with TypeScript, utilizing libraries such as Lucid and Deno. The application includes functionalities for generating wallet addresses, locking contracts, and unlocking contracts.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Description

The Aiken-cardano-typescript application provides an end-to-end solution for creating and managing smart contracts on the Cardano blockchain. Key features include generating wallet addresses, locking contracts, and unlocking contracts. The backend is powered by Aiken, and the frontend is built with TypeScript, Lucid, and Deno.

## Installation

Step-by-step instructions to set up a development environment.

### Prerequisites

- [Node.js](https://nodejs.org/) (version X.X.X)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [Deno](https://deno.land/)
- [Rust](https://www.rust-lang.org/) (for Aiken)
- [Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html)

### Steps

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/aiken-cardano-typescript.git
    cd aiken-cardano-typescript
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

    or

    ```sh
    yarn install
    ```

3. Install Rust and Cargo (if not already installed):

    ```sh
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
    source $HOME/.cargo/env
    ```

4. Install Deno globally (if not already installed):

    ```sh
    curl -fsSL https://deno.land/x/install/install.sh | sh
    ```

    or using Homebrew:

    ```sh
    brew install deno
    ```

## Usage

Instructions on how to run the application.

### Setting Up Environment Variables

1. Create a test project on [Blockfrost](https://blockfrost.io/) to obtain your `BLOCKFROST_PROJECT_ID`.
2. Run `npm generate-address` to generate a wallet address and address private key. Add private key to evironemnt varaible
3. Run `npm lock-contract` to lock contract and generate and generate transaction ID to add to the environment variable
4. To unlock contract `npm unlock-contract` Replace random string in the command `<random-string>` with transaction id printed in console after running lock contract script

5. Create a `.env` file in the root directory and add the required environment variables:

    ```env
    BLOCKFROST_PROJECT_ID=xxxxxxxxxxxx
    ADDRESS_PRIVATE_KEY=xxxxxxxxxx
    TRANSACTION_ID=xxxxxxxxxxxx
    ```

### Running the Application

To test application, run:

```sh
npm run test
