import { useState } from "react";
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
  Input,
  Link,
  Stack
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { getErrorMessage } from "../utils/errors";
import type { UserPayload } from "../types";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<UserPayload>({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.register(form);
      navigate("/login");
    } catch (submitError: unknown) {
      setError(getErrorMessage(submitError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="md" py={16}>
      <Box p={8} borderWidth="1px" borderRadius="lg">
        <Heading size="lg" mb={6}>
          Register
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
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" value={form.password} onChange={onChange} />
            </FormControl>
            <Button type="submit" colorScheme="teal" isLoading={loading}>
              Register
            </Button>
            <Link as={RouterLink} to="/login" color="teal.500">
              Have an account? Login
            </Link>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}
