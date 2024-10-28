interface Props {
  viewportHeight: number;
  anchors: {
    id: string;
    offsetTop: number;
  }[];
  scrollTop: number;
}

const handleAnchorHighlighting = (props: Props) => {
  const activeAnchors: string[] = [];

  const { anchors } = props;

  for (let i = anchors.length - 1; i >= 0; i--) {
    const anchorTop = anchors[i].offsetTop;

    if (
      anchorTop < props.scrollTop + props.viewportHeight &&
      anchorTop + 75 > props.scrollTop
    ) {
      activeAnchors.push(anchors[i].id);
    }
  }

  const closestAnchor = anchors.find(
    (anchor) => anchor.offsetTop > props.scrollTop,
  );

  if (closestAnchor && closestAnchor.offsetTop - 75 > props.scrollTop) {
    const index = anchors.findIndex(
      (anchor) => anchor.offsetTop === closestAnchor.offsetTop,
    );
    if (index !== -1) {
      const item = anchors[index - 1];
      if (item && !activeAnchors.includes(item.id)) {
        activeAnchors.push(item.id);
      }
    }
  }

  if (!closestAnchor) {
    activeAnchors.push(anchors[anchors.length - 1]?.id);
  }

  return activeAnchors;
};

export default handleAnchorHighlighting;
