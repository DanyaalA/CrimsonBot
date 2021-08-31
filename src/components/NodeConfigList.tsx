import { Selector } from 'components/Selector';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { SelectorContainer } from 'styles/Styles';

type NodeListProps = {
  onClick: any;
};

export const NodeConfigList = ({ onClick }: NodeListProps) => {
  const user = useSelector((state: RootState) => state.user.value);

  return (
    <SelectorContainer>
      {user.nodes.map((node) => {
        return (
          <Selector
            key={node}
            clickEvent={() => onClick(node)}
            message={node}
          />
        );
      })}
    </SelectorContainer>
  );
};
