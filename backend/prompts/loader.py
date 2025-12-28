import os

def load_prompt(file_name: str) -> str:
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, file_name)

    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()
