# Boilergen CLI

A CLI tool for automating TypeScript boilerplate generation.

## Installation

### Global Installation

```bash
npm install -g boilergen
```

Or with pnpm:

```bash
pnpm add -g boilergen
```

### Local Development

If you're developing the CLI tool:

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Build the project:
   ```bash
   pnpm build
   ```
4. Link for local development:
   ```bash
   npm link
   ```

## Usage

### Create a new project

```bash
boilergen create <project-name>
```

#### Options

- `-t, --template <type>` - Template to use (default: "default")
- `-f, --force` - Force creation even if directory exists

### Examples

Create a new TypeScript project with default template:

```bash
boilergen create my-new-app
```

Create a new project with custom template:

```bash
boilergen create my-new-app --template custom-template
```

Force creation of a project in an existing directory:

```bash
boilergen create existing-dir --force
```

## Templates

The default template includes:
- Basic TypeScript configuration
- package.json with dev dependencies
- A .gitignore file
- A minimal index.ts file with async runtime

## Help

Display help information:

```bash
boilergen --help
```

Show command-specific help:

```bash
boilergen create --help
```