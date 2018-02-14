<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
/* common */
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: none;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #ed4630;
}

body {
  margin: 0;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont,
               'avenir next', avenir,
               helvetica, 'helvetica neue',
               Ubuntu,
               'segoe ui', arial,
               sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  color: #434654;
  overflow: hidden;
}

/* reusable style */
.icon {
  transition: all .2s;
}

.icon:hover {
  transform: translateY(-15%);
}

.icon,
.cursor--pointer {
  cursor: pointer;
}

.overflow--hidden {
  overflow: hidden;
}

.text-align--right {
  text-align: right;
}

.color--gray {
  color: #aaa;
}

.color--blue {
  color: #409EFF;
}

/* rewrite Element ui components */
.el-main {
  overflow: inherit !important;
}

.el-checkbox__input.is-checked+.el-checkbox__label {
  color: #434654 !important;
}

.el-button {
  border-radius: 2px !important;
  min-width: 90px;
}

.button--default.el-button:focus,
.button--default.el-button:hover,
.el-message-box__btns .el-button--default:focus,
.el-message-box__btns .el-button--default:hover {
  color: rgba(234, 97, 81, 0.8);
  background-color: rgba(234, 97, 81, 0.1);
  border-color: rgba(234, 97, 81, 0.2);
}

.button--primary.el-button--primary,
.el-message-box__btns .el-button--primary {
  background-color: #ea6151;
  border-color: #ea6151;
}

.button--primary.el-button--primary:focus,
.button--primary.el-button--primary:hover,
.el-message-box__btns .el-button--primary:focus,
.el-message-box__btns .el-button--primary:hover {
  color: white;
  background-color: rgba(234, 97, 81, 0.8);
  border-color: rgba(234, 97, 81, 0.8);
}

.btn--red.el-button {
  width: 100%;
  background: #ed4630;
  color: white;
  border: 0;
  font-weight: bold;
  transition: all .3s;
}

.btn--red.el-button:hover {
  color: white;
  background: #FF6656;
}

div.el-message {
  padding: 20px;
  min-width: inherit;
  border-radius: 2px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
}

.el-message--success {
  border: none !important;
  background-color: rgba(91, 195, 162, 0.9) !important;
}

.el-message__icon,
.el-message__content {
  color: white !important;
}

.el-message__icon {
  font-size: 18px;
}

.el-message__content {
  font-weight: bold;
}

div.el-message-box {
  padding-bottom: 20px;
}

div.el-message-box__content {
  padding-top: 20px;
  padding-bottom: 20px;
}
 /* overwrite vue2-medium-editor style */
.medium-editor-element {
 min-height: 24px;
}

.medium-editor-placeholder:after {
 color: #bbb;
}

 /* toolbar */
.medium-editor-toolbar,
.medium-editor-toolbar-form,
.medium-editor-toolbar-form .medium-editor-toolbar-input {
  background-color: #434654;
}

.medium-toolbar-arrow-under:after {
  border-color: #434654 transparent transparent transparent;
  top: 50px;
}

.medium-editor-toolbar li button,
.medium-editor-toolbar-form,
.medium-editor-toolbar-form .medium-editor-toolbar-input {
  height: 50px;
}

.medium-editor-toolbar li button {
  min-width: 50px;
  border-right: 0;
  font-weight: 700;
}

.medium-editor-action .iconfont {
  font-size: 12px;
}

.medium-editor-toolbar li .medium-editor-action-underline {
  text-decoration: none;
}

.medium-editor-toolbar li button.medium-editor-action-h2,
.medium-editor-toolbar li button.medium-editor-action-h3 {
  font-size: 13px;
}

/* toolbar form */
.medium-editor-toolbar-input {
  padding: 6px 10px 6px 20px !important;
}

a.medium-editor-toolbar-save {
  font-size: 18px;
}

a.medium-editor-toolbar-close {
  margin-right: 20px;
}

/* anchor preview */
.medium-editor-toolbar-anchor-preview {
  border-radius: 4px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
}

.medium-editor-toolbar-anchor-preview a {
  margin: 0;
}

.medium-editor-toolbar-anchor-preview-label {
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 20px;
}

.medium-editor-toolbar-anchor-preview .iconfont {
  font-size: 20px;
  color: #ffedd5;
}

.medium-editor-toolbar-anchor-preview-edit {
  margin-right: 10px;
  display: inline-block;
  cursor: pointer;
}
</style>
