<script>
/**
 * @param {boolean} hideChildren 隐藏所有子菜单
 * @param {boolean} hidden 在菜单中隐藏本路由对应的菜单
 */
export default {
  name: 'MenuItem',
  functional: true,
  render(h, { props }) {
    const {
      route: {
        path,
        hidden,
        children,
        hideChildren,
        meta: { icon, title } = {},
      },
    } = props;
    // 是否有一个显示的子菜单，并且路径与父路径不同
    const hasOneShowingChild = (children = []) => {
      const showingChild = children.filter(item => !item.hidden);
      if (showingChild.length === 0) {
        return false;
      }
      return true;
    };
    // 渲染本路由对应的菜单
    const renderMenu = () => (
      <a-menu-item key={path}>
        <router-link to={path}>
          {icon && <a-icon type={icon} />}
          <span>{title}</span>
        </router-link>
      </a-menu-item>
    );
    // 渲染子菜单
    const renderSubmenu = () => (
      <a-sub-menu key={path}>
        <template slot="title">
          {icon && <a-icon type={icon} />}
          <span>{title}</span>
        </template>
        {children.map(item => (
          <menu-item route={item} key={item.path} />
        ))}
      </a-sub-menu>
    );

    // 隐藏本路由
    if (hidden) {
      return null;
    }
    // 隐藏所有子菜单
    if (hideChildren) {
      return renderMenu();
    }
    // 存在可显示的子菜单
    if (children && hasOneShowingChild(children)) {
      return renderSubmenu();
    }
    // 没有子菜单 或 没有可显示的子菜单
    return renderMenu();
  },
};
</script>
