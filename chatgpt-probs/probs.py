def find_first_occurrence(elts, target):
    if len(elts) == 0 or target is None:
        raise ValueError('error: input must be a nonempty list and an integer target')

    low, high = 0, len(elts) - 1

    while low <= high:
        mid = low + (high - low) // 2

        if elts[mid] < target:
            low = mid + 1
        elif elts[mid] > target:
            high = mid - 1
        else:
            if mid == 0 or elts[mid - 1] != target:
                return mid
            high = mid - 1

    return -1


def is_palindrome(s):
    s = s.lower()
    left, right = 0, len(s) - 1

    while left < right:
        if not s[left].isalpha():
            left += 1
        elif not s[right].isalpha():
            right -= 1
        elif s[left] != s[right]:
            return False
        else:
            left += 1
            right -= 1

    return True

def count_product_ids(product_ids):
    if not product_ids:
        return {}

    count_dict = {}
    for id in product_ids:
        if type(id) is not str:
            product_ids.remove(id)
        elif id in count_dict:
            count += 1
        else:
            count_dict[id] = 1

    return count_dict

from collections import defaultdict

def count_product_ids(product_ids):
    if type(product_ids) != list:
        raise ValueError('error: input must be a list')

    freqs = defaultdict(int)

    for product_id in product_ids:
        assert type(product_id) == str
        freqs[product_id] += 1

    return freqs


MIN_TEMP = -459.67

def fahrenheit_to_celsius(temp_fahrenheit):
    return (temp_fahrenheit - 32) * (5/9)

def convert_temperatures(temps_fahrenheit):
    if not isinstance(temps_fahrenheit, list):
        raise TypeError("Input must be a list of temperatures")

    temps_celsius = []
    for temp in temps_fahrenheit:
        if temp < MIN_TEMP:
            print("Invalid temperature detected, skipping...")
            continue
        temp_celsius = fahrenheit_to_celsius(temp)
        temps_celsius.append(round(temp_celsius, 2))

    return temps_celsius


def calculate_total_revenue(orders):
    if not isinstance(orders, list) or not all(isinstance(order, dict) for order in orders):
        raise TypeError("Invalid input: Orders should be a list of dictionaries")

    total_revenue = 0
    for order in orders:
        if 'price' in order:
            total_revenue += order.get('price') * order.get('quantity', 1)
        else:
            print('order did not have a price')
            # More logic to handle this appropriately

    return total_revenue

def analyze_steps(daily_steps, threshold=5000):
    if not isinstance(daily_steps, list) or not all(isinstance(steps, int) for steps in daily_steps):
        raise TypeError("Invalid input: daily_steps should be a list of integers")

    total_steps = sum(daily_steps)
    average_steps = total_steps / len(daily_steps)
    inactive_days = [day for day, steps in enumerate(daily_steps) if steps < threshold]

    return average_steps, inactive_days


from datetime import datetime

def update_book_statuses(books, current_date):
    if not isinstance(books, list) or not all(isinstance(book, dict) for book in books):
        raise TypeError("Invalid input: books should be a list of dictionaries")

    for book in books:
        return_date = datetime.strptime(book['return_date'], '%Y-%m-%d')
        if current_date > return_date:
            book['status'] = 'OVERDUE'
        else:
            book['status'] = 'ON TIME'

    return books

def categorize_customers(customers):
    if not isinstance(customers, list) or not all(isinstance(customer, dict) for customer in customers):
        raise ValueError("Invalid input: customers should be a list of dictionaries")

    for customer in customers:
        total_purchases = sum(customer['purchases'])
        if total_purchases > 1000:
            customer['category'] = 'Platinum'
        elif total_purchases > 500:
            customer['category'] = 'Gold'
        else:
            customer['category'] = 'Silver'

    return customers


