from typing import List

# Mock Knowledge Base (Company FAQs)
COMPANY_KNOWLEDGE = [
    {"q": "What is SBS Investments? Who are you?", "a": "We are SBS Investments, a certified financial advisor offering comprehensive wealth management, mutual funds, SIPs, portfolio management, and financial education."},
    {"q": "What services do you provide? What do you do?", "a": "We offer Financial Planning, Retirement Planning, Investment Management, Mutual Fund & SIP Advisory, Tax Planning, Corporate & Retail Loans, Insurance Solutions, NRI Investment Services, Portfolio Review & Rebalancing, and Estate Planning."},
    {"q": "How can I contact support or get in touch?", "a": "You can reach us through our Contact Page."},
    {"q": "Do you provide loans or insurance?", "a": "Yes, we provide Corporate & Retail Loans as well as comprehensive Insurance Solutions."},
    {"q": "What tools or calculators do you offer?", "a": "We offer Financial Calculators including an Investment Calculator and a Mutual Fund Calculator to help you plan your wealth."}
]

def search_company_knowledge(query: str) -> str:
    """
    A simple mock RAG implementation.
    In a real app, this would embed the query and search a Vector Database.
    """
    query_lower = query.lower()
    relevant_context = []
    
    for item in COMPANY_KNOWLEDGE:
        # Simple keyword matching
        if any(word in query_lower for word in item["q"].lower().split()):
            relevant_context.append(f"Q: {item['q']}\nA: {item['a']}")
            
    if not relevant_context:
        return "No specific company information found for this query."
        
    return "\n\n".join(relevant_context)
