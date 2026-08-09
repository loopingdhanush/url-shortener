import type {

    Request,

    Response

} from "express";

import { ReportingService } from "./service.js";

const service =
    new ReportingService();

export async function getReport(

    req: Request,

    res: Response

) {

    const report =
        await service.getReport(

            req.params.urlId as string,

            req.user!.id

        );

    return res.json({

        success: true,

        data: report

    });

}