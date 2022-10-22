import {Button, Card, Paper, Tabs, Text} from '@mantine/core';
import {GetServerSideProps} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {NextRouter, useRouter} from 'next/router';
import {VFC} from 'react';
import {SellerUpdater} from '../../components/business/SellerUpdater';
import LogoutSvg from '../../components/svg/LogoutSvg';
import {prisma} from '../../lib/prisma';

export interface BackOfficeProps {}

const logout = async (router: NextRouter) => {
  const res = await fetch(`/api/admin/logout?token=${router.query.token}`);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  if (data) {
    router.push(`/admin/login`);
  } else {
    /*     TODO: PUSH MESSAGE */
  }
};

const BackOffice: VFC<BackOfficeProps> = (props: BackOfficeProps) => {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Adm - Login</title>
        <meta name="description" content="Back office" />
        <meta name="robots" content="noindex"></meta>
        <link rel="icon" href="/logo.webp" />
        <meta property="og:title" content={'Adm - Menu'} />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={url} />
        <meta property="og:image" content={'/logo.webp'} />
        <meta property="og:image:alt" content="M" />*/}
        <meta property="og:description" content={'Description'} />
        <meta property="og:site_name" content="MeilleursCashback" />
      </Head>
      <main className="flex flex-col items-center">
        <Card
          className="w-3/4 mt-24"
          style={{height: 'auto'}}
          radius="md"
          p="xl"
          withBorder
          {...props}
        >
          <div className="flex flex-row justify-between">
            <Text size="lg" weight={500}>
              Menu
            </Text>
            <Button
              size="md"
              color="red"
              radius="md"
              className="w-full sm:w-auto"
              onClick={async () => {
                logout(router);
              }}
              leftIcon={<LogoutSvg width={'1rem'}></LogoutSvg>}
            >
              Déconnexion
            </Button>
          </div>

          <Tabs defaultValue="gallery" className="h-full mt-6">
            <Tabs.List>
              <Tabs.Tab value="gallery">Recherche & Modificateur Seller</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="gallery" pt="xs" className="h-full">
              <SellerUpdater></SellerUpdater>
            </Tabs.Panel>

            <Tabs.Panel value="messages" pt="xs">
              Messages tab content
            </Tabs.Panel>

            <Tabs.Panel value="settings" pt="xs">
              Settings tab content
            </Tabs.Panel>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<BackOfficeProps, {token: string}> = async (
  context
) => {
  // Avoid soft 404
  if (!context.query || Object.keys(context.query).length > 1) {
    return {notFound: true};
  }

  try {
    let userToken: string | undefined = context.query.token?.toString();

    if (!userToken) {
      return {
        notFound: true,
      };
    }

    const administrator = await prisma.administrator.findFirst({
      where: {connectionToken: userToken},
    });

    if (!administrator) {
      return {
        notFound: true,
      };
    }

    return {props: {}};
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default BackOffice;
