import styled from 'styled-components';

const StyledIcon = styled.span`
  font-size: 1.35em;
`;

export default function Icon({ name }: { name: string }) {
  return (
    <StyledIcon className="material-symbols-outlined">{name}</StyledIcon>
  );
}
