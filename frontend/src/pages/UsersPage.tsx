import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { api } from "../api/client";
import { useAuth } from "../state/AuthContext";
import { getErrorMessage } from "../utils/errors";
import type { AuthUser, UserPayload } from "../types";

const emptyForm: UserPayload = { name: "", email: "", password: "" };

export default function UsersPage() {
  const { user, logout } = useAuth();
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [form, setForm] = useState<UserPayload>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadUsers() {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (loadError: unknown) {
      setError(getErrorMessage(loadError));
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (editingId !== null) {
        await api.updateUser(editingId, form);
      } else {
        await api.createUser(form);
      }
      resetForm();
      await loadUsers();
    } catch (submitError: unknown) {
      setError(getErrorMessage(submitError));
    } finally {
      setLoading(false);
    }
  };

  const onEdit = (selectedUser: AuthUser) => {
    setEditingId(selectedUser.id);
    setForm({ name: selectedUser.name, email: selectedUser.email, password: "" });
  };

  const onDelete = async (id: number) => {
    setError("");
    try {
      await api.deleteUser(id);
      await loadUsers();
    } catch (deleteError: unknown) {
      setError(getErrorMessage(deleteError));
    }
  };

  return (
    <Container maxW="5xl" py={8}>
      <HStack justify="space-between" mb={8}>
        <Box>
          <Heading size="lg">Users Management</Heading>
          <Box color="gray.600">Signed in as {user?.email}</Box>
        </Box>
        <Button onClick={logout}>Logout</Button>
      </HStack>

      <Box p={6} borderWidth="1px" borderRadius="lg" mb={8}>
        <Heading size="md" mb={4}>
          {editingId ? "Update User" : "Add User"}
        </Heading>
        <form onSubmit={onSubmit}>
          <Stack spacing={4}>
            {error ? (
              <Alert status="error">
                <AlertIcon />
                {error}
              </Alert>
            ) : null}
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={form.name} onChange={onChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={form.email} onChange={onChange} />
            </FormControl>
            <FormControl isRequired={editingId === null}>
              <FormLabel>{editingId ? "Password (optional)" : "Password"}</FormLabel>
              <Input type="password" name="password" value={form.password} onChange={onChange} />
            </FormControl>
            <HStack>
              <Button type="submit" colorScheme="teal" isLoading={loading}>
                {editingId ? "Update" : "Create"}
              </Button>
              {editingId ? (
                <Button onClick={resetForm} variant="outline">
                  Cancel
                </Button>
              ) : null}
            </HStack>
          </Stack>
        </form>
      </Box>

      <Box p={6} borderWidth="1px" borderRadius="lg">
        <Heading size="md" mb={4}>
          Users
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((listedUser) => (
              <Tr key={listedUser.id}>
                <Td>{listedUser.id}</Td>
                <Td>{listedUser.name}</Td>
                <Td>{listedUser.email}</Td>
                <Td>
                  <HStack>
                    <Button size="sm" onClick={() => onEdit(listedUser)}>
                      Edit
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={() => onDelete(listedUser.id)}>
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
}
