import { Button } from "@mantine/core";
import { fun_coba_tekan } from "../_fun/coba_tekan";
import { FormEvent } from "react";

export default function WidgetTombol() {
    async function onSubmit(event: FormEvent) {
        'use server'
      }
     
      return (
        <form onSubmit={onSubmit}>
          <input type="text" name="name" />
          <button type="submit">Submit</button>
        </form>
      );
}