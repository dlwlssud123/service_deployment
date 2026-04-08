import json
import re

def fix():
    with open('data/columns.json', 'r', encoding='utf-8') as f:
        text = f.read()

    # 기호 제거
    text = re.sub(r'<<<<<<< HEAD\n?', '', text)
    text = re.sub(r'=======\n?', '', text)
    text = re.sub(r'>>>>>>> [a-f0-9]+\n?', '', text)

    objs = []
    blocks = re.split(r'\{\s*"id":', text)
    
    for block in blocks[1:]:
        t = '{"id":' + block
        # date 값이 나올 때까지 캡처
        match = re.search(r'(\{.*?"date"\s*:\s*"[0-9\-]+"\s*\})', t, re.DOTALL)
        if match:
            s = match.group(1)
            # 파이썬에서 줄바꿈이 있는 문자열을 JSON으로 파싱하려 할 때 문제가 생길 수 있어 이스케이프가 잘 되어 있는지 확인. 
            # 원본 JSON 파일 내에는 \n 이 아니라 실제 새 줄 문자가 들어갔을 수도 있지만, 만약 raw newline이 있다면 \n으로 바꾼다.
            # 하지만 이미 string 밖에는 영향을 안 주도록 처리하기가 어려우니, 문자열 안의 raw newline을 찾아서 치환해야 한다.
            s = re.sub(r'(?<!\\)\n', r'\\n', s)
            s = s.replace('\\n}', '\n}')
            s = s.replace(',\\n', ',\n')
            s = s.replace('{\\n', '{\n')
            
            # 파이썬 json 모듈은 엄격하므로, 그냥 정규식으로 title, content, date를 추출해서 딕셔너리로 만드는 것이 훨씬 안전하다.
            pass

    # 정규식 기반 추출
    objs2 = []
    # 위 방식이 실패할 가능성이 있으니 정규식으로 안전하게 추출
    matches = re.finditer(r'\"title\"\s*:\s*\"(.*?)\",\s*\"content\"\s*:\s*\"(.*?)\",\s*\"date\"\s*:\s*\"(.*?)\"', text, re.DOTALL)
    for m in matches:
        title = m.group(1)
        content = m.group(2)
        date = m.group(3)
        objs2.append({
            "title": title,
            "content": content,
            "date": date
        })

    unique = {}
    for o in objs2:
        if o['title'] not in unique:
            unique[o['title']] = o

    final = list(unique.values())
    final.sort(key=lambda x: x.get('date', ''), reverse=True)
    
    for i, o in enumerate(final):
        o['id'] = len(final) - i

    with open('data/columns.json', 'w', encoding='utf-8') as f:
        json.dump(final, f, ensure_ascii=False, indent=2)

    print(f'Successfully merged {len(final)} columns.')

if __name__ == "__main__":
    fix()
