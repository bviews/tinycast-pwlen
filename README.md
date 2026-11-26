# tinycast-pwlen

Tinycast 本地密码生成插件，沿用 Alfred 的 `pwlen` 用法。

## 安装

```sh
git clone https://github.com/bviews/tinycast-pwlen.git
```

在 Tinycast 打开 **Settings → Extensions → Install → Add from folder**，选择克隆的目录。仓库已包含可直接加载的 JavaScript 和词表，无需构建。

## 使用

1. 打开 Tinycast，搜索并运行 **pwlen**。
2. 输入长度（1–4096），留空时默认 20 位。
3. 用方向键选中候选，按 **回车**复制。按 **⌘R** 重新生成，或从操作菜单选择粘贴。

候选包括含符号、字母数字、易辨识字母数字、纯数字、可发音词组和英文单词。前四种严格匹配输入长度。后两种用连字符拼接完整词，列表显示实际长度和估算的熵（bits）。

插件通过系统随机源在本地生成密码。词表随插件提供，可离线使用。

## 来源

插件代码采用 MIT 许可证。命令行为、可发音音节组合和图标源自 Dean Jackson 的 [Alfred Password Generator](https://github.com/deanishe/alfred-pwgen)（MIT，Copyright © 2015 Dean Jackson）。英文词表取自 macOS 的 /usr/share/dict/words，保留最多六个字符的词，转为小写并去重。
