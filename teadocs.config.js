'use strict';
const path = require('path');

module.exports = {
    doc: {
        name: "Julia 中文文档",
        description: "这是Julia官方的中文文档，Julia 是一个面向科学计算的高性能动态高级程序设计语言。其语法与其他科学计算语言相似。在许多情况下拥有能与编译型语言相媲美的性能。Julia 是个灵活的动态语言，适合科学和数值计算，性能可与传统静态类型语言媲美。",
        version: "1.0.1",
        dir: "./src",
        outDir: "",
        staticDir: ""
    },
    theme: {
        dir: "", 
        title: "Julia 官方中文文档",
        headHtml: `
        <meta name="description" content="这是Julia官方的中文文档，Julia 是一个面向科学计算的高性能动态高级程序设计语言。其语法与其他科学计算语言相似。在许多情况下拥有能与编译型语言相媲美的性能。Julia 是个灵活的动态语言，适合科学和数值计算，性能可与传统静态类型语言媲美。" />
        <meta name="keywords" content="julia中文文档,,julia中文手册,julia中文api,julia中文教程,julia教程,julia下载安装,julia" />
        <link rel="shortcut icon" href="/static/favicon.ico"/>
        `,
        footHtml: `
        `,
        isMinify: true, 
        rootPath: "/"
    },
    nav: {
        tree: "./tree"
    }
}