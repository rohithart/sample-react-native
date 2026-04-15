 ERROR  [Error: Objects are not valid as a React child (found: object with keys {type, content}). If you meant to render a collection of children, use an array instead.]

Code: entity-card.tsx
  89 |           {title}
  90 |         </Text>
> 91 |         {subtitle ? (
     |          ^
  92 |           <Text numberOfLines={1} style={{ fontSize: 13, color: sub }}>
  93 |             {subtitle}
  94 |           </Text>
Call Stack
  EntityCard (components/cards/entity-card.tsx:91:10)
  FlatList.props.renderItem (app/admin/workflows/[id].tsx:48:13)
  WorkflowsListScreen (app/admin/workflows/[id].tsx:39:8)
  AdminLayout (app/admin/_layout.tsx:72:10)
  RootLayoutContent (app/_layout.tsx:23:9)
  RootLayout (app/_layout.tsx:46:17)