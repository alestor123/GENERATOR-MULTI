<h1 align=center><%= moduleName.toUpperCase() %></h1>
<% if (icon) { %>
<p align=center>
<img src="<%= icon %>" width=300 alt="icon">
</p>
<% } %>
> <%= moduleDescription %>
<p align=center>
<img src="https://img.shields.io/github/license/<%= ghUname %>/<%= repoName.toUpperCase() %>" alt=issues >
<a href="https://github.com/<%= ghUname %>/<%= repoName.toUpperCase() %>/issues">
<img src="https://img.shields.io/github/issues-raw/<%= ghUname %>/<%= repoName.toUpperCase() %>"></a>
<img src="https://github.com/<%= ghUname %>/<%= repoName.toUpperCase() %>/actions/workflows/main.yml/badge.svg?branch=master">
<a href="https://www.npmjs.com/package/<%= moduleName %>"><img src="https://img.shields.io/npm/v/<%= moduleName %>"></a>
</p>
<p align=center>
<a href="https://npmjs.org/package/<%= moduleName %>">
<img src="https://nodei.co/npm/<%= moduleName %>.png"></a>
</p>

## 🚀 Usage

## API

```
<%= camelCase %>(input)
```
<% if (cli) { %>
## Quick use
```
$ npx <%= moduleName %>
```
## CLI
```
$ npm install -g <%= moduleName %>
```
<% } %>
<% if (donate) { %>

## 💖 [Donate](<%= donate %>)
<% } %>


## Author

👤 **<%= authorName %>**

- Twitter: [@<%= twitter %>](https://twitter.com/<%= twitter %>)
- Github: [@<%= ghUname %>](https://github.com/<%= ghUname %>)


## 📝 License

Copyright © <%= year %> [<%= authorName %>](https://github.com/<%= ghUname %>).<br />
