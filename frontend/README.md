## Mono Repo Structure is inspired by:
https://www.jannikbuschke.de/blog/monorepo-with-lerna-react-and-typescript/
https://github.com/Quramy/lerna-yarn-workspaces-example

## Commands

### `link:packages`
Build and watch on all packages with a `watch` script 
and bootstrap them in order to link them to the main packages (web, mobile, ..) 
Then we can make live changes on the sub packages which get automatically applied to the main packages.

### `bootstrap`
https://github.com/lerna/lerna/tree/main/commands/bootstrap

### `watch`
Run `watch` script on each package that has one.
