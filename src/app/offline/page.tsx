import { Container, Stack, Text, Title } from '@mantine/core';

// Fallback offline sederhana — ditampilkan service worker saat navigasi gagal
// karena ga ada koneksi network. Styling minimal, bisa dipercantik nanti.
export default function OfflinePage() {
  return (
    <Container size="xs" py="xl">
      <Stack align="center" gap="xs" mt="xl">
        <Title order={2}>Kamu sedang offline</Title>
        <Text c="dimmed" ta="center">
          Ga ada koneksi internet. Cek kembali jaringanmu lalu muat ulang halaman.
        </Text>
      </Stack>
    </Container>
  );
}
