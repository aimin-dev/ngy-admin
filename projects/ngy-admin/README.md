# NgyAdmin

## Installation


### Install the package

Using npm

`npm install --save ngy-admin` [Karma](https://karma-runner.github.io).

Using yarn

`yarn add ngy-admin`

### Install dependencies
NgyAdmin depends on several packages, you need to install these packages

`npm install  @angular/cdk @angular/material @api-platform/api-doc-parser  @ngx-formly/core  @ngx-formly/material  @ngx-formly/schematics  @ngx-loading-bar/core  @ngx-loading-bar/http-client  @ngx-loading-bar/router  bootstrap  change-case  deepmerge  lodash.get  openapi-types  pluralize`

### Import NgyAdminModule

In your root module, you need to import the module, use @angular/router and have an `<router-outlet>` in your root component

``` Typescript
import { NgyAdminModule } from 'ngy-admin';
// ...

@NgModule({
  // ...
  imports: [
    // ...
    NgyAdminModule.forRoot({
      entrypoint: 'https://your-hydra-rest-api-url',
      basePath: 'admin',
    }),
    // ...
  ],
  // ...
})
export class AppModule { }
```

### Add a `global` variable on `window`

In your `index.html` file, add the following line of code :
``` JavaScript 
<script>window.global = window;</script>
```

### Include ngy-admin styles
``` scss
@import '~ngy-admin/src/assets/scss/styles.scss';
```

**That's it! You can run your app and access your admin in `/admin`**

*Enjoy*
