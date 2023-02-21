import { JSON } from "json-as/assembly";
import { Console } from "./console";
import {
    Input,
    NoDiscount,
    Discounts,
    ProductVariant,
    CartLine, DiscountNode, DiscountMetafieldValue,
} from './api'

class Configuration {
    static DEFAULT_QUANTITY: i32 = 999;
    static DEFAULT_PERCENTAGE: f64 = 0.0;

    public quantity: i32;
    public percentage: f64;

    constructor(discountMetaFieldValue: DiscountMetafieldValue | null) {
        if (discountMetaFieldValue === null) {
            this.quantity = Configuration.DEFAULT_QUANTITY;
            this.percentage = Configuration.DEFAULT_PERCENTAGE;
        } else {
            this.quantity = discountMetaFieldValue.quantity;
            this.percentage = discountMetaFieldValue.percentage;
        }
    }

}
const customDiscount = (input: string): string => {
    const parsedInput = JSON.parse<Input>(input);
    const noDiscount: NoDiscount = new NoDiscount();
    const discountNode: DiscountNode = parsedInput.discountNode;
    const discountMetafieldValue  = JSON.parse<DiscountMetafieldValue>(discountNode.metafield.value);
    const configuration: Configuration = new Configuration(discountMetafieldValue);
    const targets: ProductVariant[] = [];

    for (let i = 0; i < parsedInput.cart.lines.length; i++) {
        const line: CartLine = parsedInput.cart.lines[i];

        if (line.quantity >= configuration.quantity) {
            const productVariant: ProductVariant = {
                productVariant: {
                    id: line.merchandise.id.toString(),
                    quantity: line.quantity,
                }
            };

            targets.push(productVariant);
        }
    }
    if (targets.length === 0) {
        return JSON.stringify(noDiscount);
    } else if(discountNode === null) {
        return JSON.stringify(noDiscount);
    } else {
        const result: Discounts = {
            discounts: [{
                message: '10% off',
                targets: targets,
                value: {
                    percentage: {
                        value: configuration.percentage.toString(),
                    }
                }
            }],
            discountApplicationStrategy: "FIRST",
        }
        return JSON.stringify(result);
    }
}

const input = Console.readAll()!;
const output = customDiscount(input)
Console.log(output);