function getPropertyValue(el, property) {
  return Number.parseFloat(
    window.getComputedStyle(el, false).getPropertyValue(property),
  );
}

export default {
  bind(el) {
    const modal = el.querySelector('.ant-modal');
    const header = el.querySelector('.ant-modal-header');
    // 设置样式
    modal.style.cssText += ';padding-bottom: 0;';
    header.style.cssText += ';cursor: move;user-select: none;';

    header.onmousedown = ({ clientX, clientY }) => {
      const { offsetTop: headerOffetTop, offsetLeft: headerOffetLeft } = header;
      const { clientWidth, clientHeight } = document.documentElement;
      const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = modal;
      // 鼠标按下，计算当前元素距离可视区的距离
      const disY = clientY - headerOffetTop;
      const disX = clientX - headerOffetLeft;
      // 弹框的默认位置有值，需要进行计算
      const minTop = -offsetTop;
      const minLeft = -offsetLeft;
      // 最大值需要减掉初始值
      const maxTop = clientHeight - offsetTop - offsetHeight;
      const maxLeft = clientWidth - offsetLeft - offsetWidth;
      // 开始移动之前的 left 和 top 值
      const startTop = getPropertyValue(modal, 'top');
      const startLeft = getPropertyValue(modal, 'left');

      document.onmousemove = ({ clientX, clientY }) => {
        // 通过事件委托，计算移动的距离
        let left = clientX - disX;
        let top = clientY - disY;

        // 边界处理
        if (left < minLeft) {
          left = minLeft;
        } else if (left > maxLeft) {
          left = maxLeft;
        }

        if (top < minTop) {
          top = minTop;
        } else if (top > maxTop) {
          top = maxTop;
        }

        // 移动当前元素
        modal.style.cssText += `;left: ${left + startLeft}px;top: ${top +
          startTop}px;`;
      };

      document.onmouseup = () => {
        document.onmouseup = document.onmousemove = null;
      };
    };
  },
};
