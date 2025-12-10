# GitHub Actions Workflows

This directory contains GitHub Actions workflows for the Next.js AI Chatbot project.

## Workflows

### CI Workflow (`ci.yml`)

Runs on every push to `main` and on all pull requests. This workflow:

1. **Lint and Build Job**
   - Installs dependencies using pnpm
   - Runs linting checks (`pnpm lint`)
   - Builds the application (`pnpm exec next build` - skips DB migration)

2. **Test Job**
   - Installs dependencies using pnpm
   - Installs Playwright browsers
   - Runs Playwright tests
   - Uploads test results as artifacts

### Vercel Deployment Workflow (`vercel.yml`)

Deploys the application to Vercel on every push to `main` and on pull requests.

- **Preview Deployments**: Created for pull requests
- **Production Deployments**: Created for pushes to the `main` branch
- **PR Comments**: Automatically comments on PRs with the preview deployment URL

## Required Secrets

To use these workflows, you need to configure the following secrets in your GitHub repository settings:

### For Vercel Deployment (`vercel.yml`)

1. **`VERCEL_TOKEN`**: Your Vercel authentication token
   - Get it from: https://vercel.com/account/tokens
   - Required for deploying to Vercel via CLI

2. **`VERCEL_ORG_ID`**: Your Vercel organization ID
   - Found in your Vercel project settings
   - Or run `vercel link` locally and check `.vercel/project.json`

3. **`VERCEL_PROJECT_ID`**: Your Vercel project ID
   - Found in your Vercel project settings
   - Or run `vercel link` locally and check `.vercel/project.json`

### Getting Vercel IDs

To get your `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`:

```bash
# Link your project to Vercel (if not already linked)
vercel link

# The IDs will be saved in .vercel/project.json
cat .vercel/project.json
```

### Setting Up Secrets

1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add each secret with its corresponding value

## Environment Variables for CI

The CI workflow uses mock environment variables for building and testing. For actual deployments, Vercel will use the environment variables configured in your Vercel project settings.

## Local Testing

To test the workflows locally, you can use [act](https://github.com/nektos/act):

```bash
# Install act
brew install act  # macOS
# or
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash  # Linux

# Run CI workflow
act pull_request

# Run specific job
act -j lint-and-build
```

## Troubleshooting

### Build Failures

If builds fail due to missing environment variables, ensure that:
- Mock values are provided in the CI workflow for build-time variables
- Vercel project has all required environment variables configured

**Note**: The CI workflow uses `pnpm exec next build` instead of `pnpm build` to skip database migrations during CI builds. The full build command (`pnpm build`) runs `tsx lib/db/migrate && next build`, which requires a live database connection. Vercel handles migrations during deployment with proper environment variables.

### Test Failures

If Playwright tests fail:
- Check the uploaded test artifacts in the GitHub Actions run
- Tests may need database setup or mock data
- Consider adding a PostgreSQL service container if needed

### Deployment Failures

If Vercel deployments fail:
- Verify all three Vercel secrets are correctly set
- Ensure the Vercel project is properly linked
- Check Vercel dashboard for detailed error logs
