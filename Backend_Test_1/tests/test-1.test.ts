import {getETHBalance} from "../src";

describe("Test 1", () => {
    it("timestamp 1719031179", async () => {
        const ethBalance = await getETHBalance(1719031179);
        console.log(ethBalance);
    });
});
