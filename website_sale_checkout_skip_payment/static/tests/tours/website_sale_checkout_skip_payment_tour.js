
import {registry} from "@web/core/registry";
import tourUtils from "@website_sale/js/tours/tour_utils";

registry.category("web_tour.tours").add("website_sale_checkout_skip_payment", {
    test: true,
    url: "/shop",
    steps: () => [
        ...tourUtils.searchProduct("Storage Box"),
        {
            content: "select Storage Box",
            trigger: '.oe_product_cart:first a:contains("Storage Box")',
        },
        {
            content: "click on add to cart",
            trigger: '#product_detail form[action^="/shop/cart/update"] #add_to_cart',
        },
        tourUtils.goToCart(),
        tourUtils.goToCheckout(),
        {
            trigger: '.btn-primary:contains("Confirm")',
        },
        {
            trigger: ".btn:contains('Confirm')",
            extra_trigger: "b:contains('Billing')",
        },
        {
            trigger: "a[href='/shop']",
            extra_trigger: "h4:contains('Payment Information')",
        },
        {
            content: "Check confirmation and that the cart has been left empty",
            trigger: "a:has(.my_cart_quantity:containsExact(0))",
            extra_trigger: "h4:contains('Payment Information')",
        },
    ],
});
