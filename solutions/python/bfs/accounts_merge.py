class Solution:
    def build_graph(self, accounts):
        email_to_name = {}
        email_to_account_ids = defaultdict(set)
        
        for account_id, account in enumerate(accounts):
            name, *emails = account
            
            for email in emails:
                email_to_account_ids[email].add(account_id)
                email_to_name[email] = name
                
        return email_to_name, email_to_account_ids
    
    def get_email_group_after_merge(self, start_email, email_to_account_ids, queue, visited, accounts):
        queue.append(start_email)
        visited.add(start_email)
        
        email_group_after_merge = []
        
        while queue:
            email = queue.popleft()
            
            email_group_after_merge.append(email)
            
            account_ids_that_share_this_email = email_to_account_ids[email]
            
            for account_id in account_ids_that_share_this_email:
                name, *emails = accounts[account_id]
                
                for email in emails:
                    if email in visited:
                        continue
                        
                    queue.append(email)
                    visited.add(email)
        
        email_group_after_merge.sort()
        return email_group_after_merge
    
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        email_to_name, email_to_account_ids = self.build_graph(accounts)
        
        merged_accounts = []
        queue = deque()
        visited = set()
        
        for email in email_to_account_ids:
            if email in visited:
                continue

            name = email_to_name[email]
            
            email_group_after_merge = self.get_email_group_after_merge(email, email_to_account_ids, queue, visited, accounts)
            
            merged_account = [name] + email_group_after_merge
            
            merged_accounts.append(merged_account)
        return merged_accounts