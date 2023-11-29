module.exports = {
  branches: ['master'], // The branch where semantic-release check your commits
  ci: false, // If you run this in
  dryRun: false, // for local testing
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: './CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: true,
      },
    ],
    [
      '@semantic-release/git',
      {
        message:
          'chore(release): ${nextRelease.version} [skip ci] [skip-cd]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
