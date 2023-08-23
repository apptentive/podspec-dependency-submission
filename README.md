# Podspec Dependency Submission

This GitHub Action calculates dependencies for a podspec file.

### Running locally

Because we are checking in the Typescript output, you may see check failures if you don't generate the contents of `dist/` in a similar manner to our CI check. You can easily rectify this by regenerating in a codespace and using what we use in our workflow YAML:

```
npm ci --ignore-scripts
npm rebuild && npm run all
```

### Example
```yaml
name: Podspec Dependency Submission
on:
  push:
    branches:
      - main

# The API requires write permission on the repository to submit dependencies
permissions:
  contents: write
