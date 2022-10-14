import {Burger, Button, createStyles, Group, Header, Image, Select} from '@mantine/core';
import {useDisclosure} from '@mantine/hooks';
import {Seller} from '@prisma/client';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FC, useState} from 'react';
import {findManySellerSlug} from '../business/HomePage';
import SearchSvg from '../svg/SearchSvg';

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
    [theme.fn.smallerThan('lg')]: {
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

  mobilePanel: {
    backgroundColor: 'white',
    zIndex: 1000,
    gap: 0,
    position: 'absolute',
    width: '100%',
    top: 56,
    left: 0,
  },

  searchIcon: {
    [theme.fn.largerThan('xs')]: {
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
  const [pagePanelOpened, {toggle}] = useDisclosure(false);
  const [searchPanelOpened, toggleSearchPanel] = useState(false);
  const [foundedSellers, setFoundedSellers] = useState<Seller[] | null>([]);
  const router = useRouter();
  const {classes} = useStyles();

  const onSearchButtonClicked = () => {
    toggleSearchPanel(!searchPanelOpened);
  };

  return (
    <Header height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group className="w-full sm:w-auto">
          <Burger className={classes.burger} opened={pagePanelOpened} onClick={toggle} size="sm" />
          <div className="hover:cursor-pointer" style={{width: '4.5rem'}}>
            <Link href="/" passHref>
              <Image width={'100%'} height={'100%'} src="/logo.webp" alt="logo" />
            </Link>
          </div>
        </Group>
        <Group>
          <Button className="p-0" onClick={onSearchButtonClicked} variant="subtle">
            <SearchSvg width={'1.5rem'} className={classes.searchIcon}></SearchSvg>
          </Button>
        </Group>
        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            <Link key="HomePage" href="/" className={classes.link}>
              <a className={classes.link}>Accueil</a>
            </Link>
            <Link key="BestCashbackSites" href="/cashbackers" className={classes.link}>
              <a className={classes.link}>Meilleurs sites de cashback</a>
            </Link>
            <Link key="SellerList" href="/sellers" className={classes.link}>
              <a className={classes.link}>Liste des marchands</a>
            </Link>
            <Link key="TopSeller" href="/topsellers" className={classes.link}>
              <a className={classes.link}>Top marchands</a>
            </Link>
            <Link key="Contact" href="/contact" className={classes.link}>
              <a className={classes.link}>Contact</a>
            </Link>
            <Link key="GCU" href="/cgu" className={classes.link}>
              <a className={classes.link}>Mentions légales</a>
            </Link>
          </Group>
          <Select
            className={classes.search}
            icon={<SearchSvg width={'1rem'}></SearchSvg>}
            placeholder="Rechercher un vendeur"
            searchable
            rightSection={<></>}
            maxLength={120}
            onSearchChange={async (searchValue: string) => {
              if (searchValue.length <= 0) {
                return;
              }

              setFoundedSellers(await findManySellerSlug(searchValue));
            }}
            onChange={(value: string) => {
              router.push(`/seller/meilleur-cashback-${value}`);
            }}
            nothingFound={null}
            data={
              foundedSellers
                ? foundedSellers.map((seller) => ({
                    value: seller.slug ? seller.slug : 'error',
                    label: seller.name,
                  }))
                : []
            }
          />
        </Group>
      </div>

      {/* Burger menu */}
      {pagePanelOpened && (
        <Group className={classes.mobilePanel}>
          <div className="flex flex-row w-full py-2">
            <Link key="HomePage" href="/" className="w-full bg-white">
              <p className="ml-8 text-textColor self-center">Accueil</p>
            </Link>
          </div>
          <div className="flex flex-row w-full py-2">
            <Link key="BestCashbackers" href="/cashbackers" className="w-full bg-white">
              <p className="ml-8 text-textColor self-center">Meilleurs sites de cashback</p>
            </Link>
          </div>
          <div className="flex flex-row w-full py-2">
            <Link key="SellerList" href="/sellers" className="w-full bg-white">
              <p className="ml-8 text-textColor self-center">Liste des marchands</p>
            </Link>
          </div>
          <div className="flex flex-row w-full py-2">
            <Link key="TopSeller" href="/topsellers" className="w-full bg-white">
              <p className="ml-8 text-textColor self-center">Top marchands</p>
            </Link>
          </div>
          <div className="flex flex-row w-full py-2">
            <Link key="Contact" href="/contact" className="w-full bg-white">
              <p className="ml-8 text-textColor self-center">Contact</p>
            </Link>
          </div>
          <div className="flex flex-row w-full py-2">
            <Link key="GCU" href="/cgu" className="w-full bg-white">
              <p className="ml-8 text-textColor self-center">CGU</p>
            </Link>
          </div>
        </Group>
      )}
      {searchPanelOpened && (
        <Group className="w-full" style={{position: 'absolute', top: 56, left: 0, zIndex: 1000}}>
          <Select
            className="w-full"
            icon={<SearchSvg width={'1rem'}></SearchSvg>}
            placeholder="Rechercher un vendeur"
            searchable
            rightSection={<></>}
            maxLength={120}
            onSearchChange={async (searchValue: string) => {
              if (searchValue.length <= 0) {
                return;
              }

              setFoundedSellers(await findManySellerSlug(searchValue));
            }}
            onChange={(value: string) => {
              router.push(`/seller/meilleur-cashback-${value}`);
            }}
            nothingFound={null}
            data={
              foundedSellers
                ? foundedSellers.map((seller) => ({
                    value: seller.slug ? seller.slug : 'error',
                    label: seller.name,
                  }))
                : []
            }
          />
        </Group>
      )}
    </Header>
  );
};
