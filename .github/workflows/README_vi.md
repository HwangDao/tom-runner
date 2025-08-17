
# Tôm Endless Runner — Asset & Build Pack

Bạn nhận được:
- `tom_spritesheet.png` — sprite sheet (96×96 mỗi frame).
- `tom_spritesheet_meta.json` — mô tả frames/animation để nạp bằng code.
- `obstacle_tower.png` — chướng ngại vật thay xương rồng (64×128).
- `background_starfield.png` — background 1024×256 (tile ngang).
- `preview.html` — file xem thử animation chạy (không phải game).

## Cách ghép vào **chromeTrip** (Godot 3.x)

1. **Copy asset**  
   Chép 4 file PNG + JSON vào dự án, gợi ý:  
   `res://assets/characters/tom/` và `res://assets/tiles/`.

2. **Tắt filter khi import** cho tất cả PNG (Import → Filter: Off, Mipmaps: Off, Reimport).

3. **AnimatedSprite (player.tscn)**  
   Có 2 cách:

   **A) Làm trong Editor**  
   - Chọn node `AnimatedSprite` → new `SpriteFrames`.  
   - Add animation `run` và kéo 4 ô đầu ở hàng 1 (y=0) của `tom_spritesheet.png`.  
   - Set FPS = 10, Loop = On.  
   - Add `jump` (1 frame ở hàng 2), `dead` (1 frame ở hàng 3).  
   - Chỉnh `Offset` để bàn chân trùng mặt đất; chỉnh `CollisionShape2D` theo kích cỡ mới.

   **B) Nạp bằng code (GDScript)** — ví dụ minh hoạ:
   ```gdscript
   extends AnimatedSprite

   const META = preload("res://assets/characters/tom/tom_spritesheet_meta.json")
   var data = {}

   func _ready():
       data = JSON.parse(META.get_as_text()).result
       var tex = load("res://assets/characters/tom/tom_spritesheet.png")
       var frames = SpriteFrames.new()
       for anim_name in data.animations.keys():
           frames.add_animation(anim_name)
           var info = data.animations[anim_name]
           for rect in info.frames:
               var fr = AtlasTexture.new()
               fr.atlas = tex
               fr.region = Rect2(rect.x, rect.y, rect.w, rect.h)
               frames.add_frame(anim_name, fr)
           frames.set_animation_speed(anim_name, info.fps)
           frames.set_animation_loop(anim_name, info.loop)
       sprite_frames = frames
       animation = "run"
   ```

4. **Giữ 1 người chơi**  
   - Xoá hoặc ẩn Player2/logic co-op (nếu có). Đảm bảo chỉ spawn `Player` đầu tiên.

5. **Obstacle & Background**  
   - Thay texture cactus → `obstacle_tower.png`.  
   - Background: dùng `background_starfield.png` làm lớp xa; có thể tile ngang bằng `ParallaxBackground` / `TextureRect` (Expand = true, Stretch Mode = Tile).

6. **Build Web (HTML5)**  
   - Cài **Godot 3.x** + Export Templates.  
   - `Project → Export → HTML5` và tạo preset.  
   - Export ra thư mục, sẽ có `index.html`, `.pck`, `.wasm` để host.

## Host GitHub Pages (khuyên dùng)
- Tạo repo, push 3 file build (`index.html`, `.pck`, `.wasm`).  
- Bật Pages (Branch: `main`, folder `/root`).  
- Mở URL Pages là chơi được.

## Mẹo chỉnh gameplay
- Sprite mới cao/thấp khác bản cũ → nhớ chỉnh `CollisionShape2D` & raycast ground.  
- Nếu tốc độ chạy quá nhanh/chậm, xem lại biến trong `player.gd` (gravity, jump_force, speed…).

> Ghi chú: Gói này KHÔNG chứa bản build Godot hoàn chỉnh, mà là asset + cấu hình sẵn để bạn build nhanh trong 2–3 phút.
