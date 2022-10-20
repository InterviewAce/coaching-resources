COOLDOWN_PERIOD_LENGTH = 10

class Logger:
    def __init__(self):
        self.last_print_time = {}

    def shouldPrintMessage(self, timestamp, message):
        

        if message not in self.last_print_time:
            self.last_print_time[message] = timestamp
            return True

        time_since_last_print = timestamp - self.last_print_time[message]
        if time_since_last_print < COOLDOWN_PERIOD_LENGTH:
            return False

        self.last_print_time[message] = timestamp
        return True