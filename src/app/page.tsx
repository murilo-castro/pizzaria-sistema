import Image from "next/image";
import styles from "./page.module.scss";
import logoImg from "/public/logo.svg";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Page() {
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      console.log("Email e senha são obrigatórios");
      return;
    }

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      if (!response.data.token) return;

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    redirect("/order-management");
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo da Pizzaria" />
        <section className={styles.login}>
          <form action={handleLogin}>
            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu e-mail..."
              className={styles.input}
            />

            <input
              type="password"
              required
              name="password"
              placeholder="***********"
              className={styles.input}
            />

            <button type="submit">Login</button>
          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? cadastre-se
          </Link>
        </section>
      </div>
    </>
  );
}
