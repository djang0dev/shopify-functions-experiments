// everything is in AssemblyScript not TypeScript
// @ts-nocheck
import {JSON} from "json-as";

@JSON
class Merchandise {
    id: string;
    __typename: string;
}

@JSON
class CartLine {
    merchandise: Merchandise;
    quantity: i32;
}

@JSON
class Cart {
    lines: Array<CartLine>;
}

@JSON
class Input {
    cart: Cart;
    discountNode: DiscountNode;
}

@JSON
class NoDiscount {
    discounts: Array<i32>;
    discountApplicationStrategy: string;
    constructor() {
        this.discounts = new Array<i32>();
        this.discountApplicationStrategy = "FIRST";
    }
}
@JSON
class ProductVariantLine {
    id: string;
    quantity: i32;
}
@JSON
class ProductVariant {
    productVariant: ProductVariantLine;
}
@JSON
class DiscountLine {
    message: string;
    targets: Array<ProductVariant>;
    value: Value;
}
@JSON
class Discounts  {
    discounts: Array<DiscountLine>;
    discountApplicationStrategy: string;
}

@JSON
class Value {
    percentage: Percentage;
}
@JSON
class Percentage {
    value: string;
}
@JSON
class DiscountMetafieldValue {
    quantity: i32;
    percentage: f32;
}
@JSON
class DiscountMetafield {
    value: string;
}

@JSON
class DiscountNode {
    metafield: DiscountMetafield;
}

export {
    Input,
    NoDiscount,
    Discounts,
    ProductVariant,
    DiscountLine,
    Value,
    Percentage,
    CartLine,
    Merchandise,
    Cart,
    DiscountMetafield,
    DiscountNode,
    DiscountMetafieldValue,
}