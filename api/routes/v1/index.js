"use strict"

import { Router } from "express"
import auth from "./auth"

const router = Router()

/**
 * Routing.
 */
router.use("/auth", auth)

export default router
