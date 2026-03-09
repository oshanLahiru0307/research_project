
import requests
import os

url = 'http://localhost:5000/liver/predict'
# I need a dummy image or a real one. Let's see if there are any images in the project.
# I'll just send some random bytes and see if it fails at the right place.
try:
    with open('test_liver.png', 'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc\xf8\xff\xff?\x00\x05\xfe\x02\xfe\x0dc\x44\xbb\x00\x00\x00\x00IEND\xaeB`\x82')
    
    with open('test_liver.png', 'rb') as f:
        r = requests.post(url, files={'image': f})
        print(r.json())
except Exception as e:
    print(f"Error: {e}")
finally:
    if os.path.exists('test_liver.png'):
        os.remove('test_liver.png')
