//vite.config.ts
import { defineConfig } from "vite"
// import { SearchPlugin } from "vitepress-plugin-search"
import { SearchPlugin } from '@pzy915/vitepress-plugin-search'


/**
 * 支持中文搜索
 * https://github.com/emersonbottero/vitepress-plugin-search/issues/11#issuecomment-1328150584
 */

/**
 * 分词器来源
 * https://wenjiangs.com/article/segment.html
 * https://github.com/leizongmin/node-segment
 */

var Segment = require('segment');
// 创建实例
var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
segment.useDefault();

var options = {
  placeholder: "输入关键字搜索",
  buttonLabel: "Search",
  previewLength: 10,
  // 采用分词器优化，
  // encode: function (str) {
  //   return segment.doSegment(str, { simple: true });
  // },
  // tokenize: "forward", // 解决汉字搜索问题。来源：https://github.com/emersonbottero/vitepress-plugin-search/issues/11
  encode: false,
  tokenize: "full", // 使用这种配置，不会出现线上base路径丢失导致404的问题
}

export default defineConfig({
  plugins: [SearchPlugin(options)],
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: ["../.."],
    },
  },
});
