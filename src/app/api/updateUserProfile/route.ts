// app/api/update-user/route.ts
// import { updateUserSettings } from "@/app/actions/user";

import { updateUserSettings } from "@/action/action";

export async function POST(req: Request) {
  const formData = await req.formData();
  try {
    await updateUserSettings(formData);
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
