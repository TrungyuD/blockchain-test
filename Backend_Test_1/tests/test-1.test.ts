import {getETHBalance} from "../src";

describe("Test 1", () => {
    it("timestamp 1749269949", async () => {
        const totalBalance = await getETHBalance(1749269949);
        console.log(totalBalance);
    });
});
