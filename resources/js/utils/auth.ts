
import { router } from "@inertiajs/react";

export function logoutCleanUp(cleanup?: () => void) {
    cleanup?.();
    router.flushAll();
}
