import { environment } from 'src/environments/environment';
import { Product } from 'src/app/admin-page/modules/product/interfaces/product.interface';
import { CartItem } from '../services/cart-data.service';

export class CartUtil {
  public static productToCartItem(product: Product, quantity: number = 0): CartItem {
    const item: any = {
      id: product.id,
      name: product.name,
      pictureUrl: product.pictureUrl,
      price: product.price,
      taxRate: product.taxRate,
      quantity,
    };
    return this.updateItemPrice(item);
  }
  public static cloneCartItemWithQuantity(cartItem: CartItem, quantity: number): CartItem {
    const item: any = { ...cartItem, quantity };
    return this.updateItemPrice(item);
  }

  private static updateItemPrice(itemData: any) {
    const item = { ...itemData };
    item.itemPrice = formatPriceDecimal(item.price * item.weight);
    item.itemWeight = item.weight;
    item.totalPrice = formatPriceDecimal(item.itemPrice * item.quantity);
    // item.priceIncludedTax = formatPriceDecimal(item.price);
    // item.itemPriceIncludedTax = formatPriceDecimal(item.itemPrice);
    // item.totalPriceIncludedTax = formatPriceDecimal(item.totalPrice);
    // item.totalTaxFee = formatPriceDecimal(item.totalPriceIncludedTax * environment.globalTaxRate);
    return item;
  }
}

export function formatPriceDecimal(price: number): number {
  return Math.round(price * 100) / 100;
}
