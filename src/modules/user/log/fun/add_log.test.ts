import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * Regression guard untuk crash render server:
 *   TypeError: Cannot read properties of undefined (reading 'value') di funLogUser
 *
 * Penyebab: `cookies().get("_tknRV")` mengembalikan undefined saat tidak ada sesi
 * (belum login / cookie kadaluarsa), lalu `c!.value` melempar dan menggagalkan render.
 * Fix: guard `c?.value` dan early-return sebelum menyentuh unsealData/prisma.
 */

const { prismaCreate, cookiesGet, unsealData } = vi.hoisted(() => ({
  prismaCreate: vi.fn(),
  cookiesGet: vi.fn(),
  unsealData: vi.fn(),
}));

vi.mock("next/headers", () => ({ cookies: () => ({ get: cookiesGet }) }));
vi.mock("iron-session", () => ({ unsealData }));
vi.mock("@/modules/_global", () => ({
  prisma: { userLog: { create: prismaCreate } },
}));
vi.mock("@/modules/_global/bin/val_global", () => ({ pwd_key_config: "test-pwd" }));

import funLogUser from "./add_log";

describe("funLogUser cookie guard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns failure and does not throw when the session cookie is missing", async () => {
    cookiesGet.mockReturnValue(undefined); // tidak ada cookie _tknRV

    const res = await funLogUser({ act: "LOGIN", desc: "User login" });

    expect(res).toEqual({ success: false, message: "Tidak ada sesi user" });
    expect(unsealData).not.toHaveBeenCalled();
    expect(prismaCreate).not.toHaveBeenCalled();
  });

  it("returns failure when the cookie exists but has no value", async () => {
    cookiesGet.mockReturnValue({}); // cookie ada tapi .value undefined

    const res = await funLogUser({ act: "LOGIN", desc: "User login" });

    expect(res).toEqual({ success: false, message: "Tidak ada sesi user" });
    expect(unsealData).not.toHaveBeenCalled();
    expect(prismaCreate).not.toHaveBeenCalled();
  });

  it("writes a user log when a valid session cookie is present", async () => {
    cookiesGet.mockReturnValue({ value: "sealed-token" });
    unsealData.mockResolvedValue({ cIdUser: 42 });

    const res = await funLogUser({ act: "LOGIN", desc: "User login" });

    expect(unsealData).toHaveBeenCalledWith("sealed-token", { password: "test-pwd" });
    expect(prismaCreate).toHaveBeenCalledTimes(1);
    expect(prismaCreate).toHaveBeenCalledWith({
      data: { idUser: "42", activity: "LOGIN", description: "User login" },
    });
    expect(res).toEqual({ success: true, message: "Sukses" });
  });

  it("does not write a log when the session has no cIdUser", async () => {
    cookiesGet.mockReturnValue({ value: "sealed-token" });
    unsealData.mockResolvedValue({});

    const res = await funLogUser({ act: "LOGIN", desc: "User login" });

    expect(prismaCreate).not.toHaveBeenCalled();
    expect(res).toEqual({ success: true, message: "Sukses" });
  });
});
