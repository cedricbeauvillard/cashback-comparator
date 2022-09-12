import {Button, createStyles, Group, Image} from '@mantine/core';
import {FC} from 'react';
import StarSvg from '../svg/StarSvg';

const useStyles = createStyles((theme) => ({
  cashbackerItemCol: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    marginTop: '0.5rem',
  },
  cashbackerItemRow: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
}));

export const ItemCashbackerDesktop: FC = () => {
  const {classes} = useStyles();

  return (
    <tr key="ebuyclub">
      <td>
        <div style={{width: 100}}>
          <Image
            alt="logo ebuyclub"
            src="/cashbackers/logo-rectangle-ebuyclub.png"
            className="self-center"
          />
        </div>
      </td>
      <td className="w-32">
        <StarSvg width="1rem"></StarSvg>
        <StarSvg width="1rem"></StarSvg>
        <StarSvg width="1rem"></StarSvg>
        <StarSvg width="1rem"></StarSvg>
        <StarSvg width="1rem"></StarSvg>
      </td>
      <td>
        <div style={{width: '50%'}}>
          <Image
            alt="rang or"
            src="/ranking/medaille-or-classement-cashback.png"
            className="self-center"
          />
        </div>
      </td>
      <td>7 euros à l'inscription</td>
      <td>7,5%</td>
      <td>
        <Button.Group orientation="vertical" className="flex">
          <Button className="my-2 w-24">Avis</Button>
          <Button className="my-2 w-24">Visiter</Button>
        </Button.Group>
      </td>
    </tr>
  );
};
