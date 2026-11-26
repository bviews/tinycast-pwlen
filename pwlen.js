const React = require("react");
const { Action, ActionPanel, List } = require("@raycast/api");
const generate = require("./generate");
const h = React.createElement;

exports.default = function PasswordList(props) {
  const [query, setQuery] = React.useState(props.arguments?.length || "");
  const [revision, setRevision] = React.useState(0);
  const input = query.trim();
  const length = input === "" || /^0+$/.test(input) ? 20 : /^\d+$/.test(input) ? Number(input) : NaN;
  const rows = React.useMemo(() => length > 0 && length <= 4096 ? generate(length) : [], [length, revision]);
  return h(List, {
    filtering: false,
    searchText: query,
    onSearchTextChange: setQuery,
    searchBarPlaceholder: "输入密码长度（默认 20）",
  }, rows.length ? rows.map(({ label, password, bits }) => h(List.Item, {
    key: label,
    title: password,
    subtitle: label,
    accessories: [{ text: password.length + " 位 · " + Math.round(bits) + " bits" }],
    actions: h(ActionPanel, null,
      h(Action.CopyToClipboard, { title: "复制密码", content: password, concealed: true }),
      h(Action.Paste, { title: "粘贴密码", content: password }),
      h(Action, { title: "重新生成", shortcut: { modifiers: ["cmd"], key: "r" }, onAction: () => setRevision(n => n + 1) })
    ),
  })) : h(List.EmptyView, { title: "请输入 1 至 4096 的整数" }));
};
