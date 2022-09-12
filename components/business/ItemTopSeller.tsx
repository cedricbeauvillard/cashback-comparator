import {Card, createStyles, Image, Text} from '@mantine/core';
import {FC} from 'react';

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

export const ItemTopSeller: FC = () => {
  const {classes} = useStyles();

  return (
    <Card
      shadow="sm"
      p="xs"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
    >
      <Card.Section>
        <Image
          src="https://www.lerevenu.com/sites/site/files/field/image/fnac-darty.jpg"
          height={180}
          fit="contain"
          alt="sellerLogo"
        />
      </Card.Section>
      <Text weight={500} size="lg" mt="md" align="center">
        Amazon
      </Text>
    </Card>
  );
};
