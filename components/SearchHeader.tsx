import {Autocomplete, Burger, Button, createStyles, Group, Header} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import Link from 'next/link';
import {FC, useState} from 'react';
import SearchSvg from './svg/SearchSvg';
import Image from 'next/image';

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

export const SearchHeader: FC = () => {
  const [opened, {toggle}] = useDisclosure(false);
  const {classes} = useStyles();
  const [showPagePanel, setShowPagePanel] = useState(false);

  return (
    <Header height={56} className={classes.header} mb={120}>
      <div className={classes.inner}>
        <Group>
          <Burger className={classes.burger} opened={opened} onClick={toggle} size="sm" />
          <Image alt="logo" src="/logo.png" width="100%" height="50px" />
        </Group>
        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            <Link key="HomePage" href="/HomePage" className={classes.link}>
              <a className={classes.link}>Accueil</a>
            </Link>
            <Link key="BestCashbackSites" href="/CashbackerPage" className={classes.link}>
              <a className={classes.link}>Meilleurs sites de cashback</a>
            </Link>
            <Link key="SellerList" href="/SellerListPage" className={classes.link}>
              <a className={classes.link}>Liste des marchands</a>
            </Link>
            <Link key="TopSeller" href="/TopSellerPage" className={classes.link}>
              <a className={classes.link}>Top marchands</a>
            </Link>
            <Link key="Contact" href="/ContactPage" className={classes.link}>
              <a className={classes.link}>Contact</a>
            </Link>
            <Link key="GCU" href="/GCUPage" className={classes.link}>
              <a className={classes.link}>Mentions légales</a>
            </Link>
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<SearchSvg width={'1rem'}></SearchSvg>}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
          />
        </Group>
      </div>
    </Header>
  );
};
