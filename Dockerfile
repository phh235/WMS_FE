# Chọn image node để xây dựng ứng dụng Vue3
FROM node:16-alpine as build

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy các file package.json và pnpm-lock.yaml để cài đặt dependencies trước
COPY package.json pnpm-lock.yaml ./

# Cài đặt pnpm
RUN npm install -g pnpm

# Cài đặt các dependencies
RUN pnpm install

# Copy tất cả các file còn lại của dự án vào container
COPY . .

# Build ứng dụng Vue3
RUN pnpm run build

# Chuyển sang một image Nginx để phục vụ các file static
FROM nginx:alpine

# Sao chép các tệp build từ stage trước vào thư mục /usr/share/nginx/html/
COPY --from=build /app/dist /usr/share/nginx/html

# Expose cổng 80 cho Nginx
EXPOSE 80

# Khởi chạy Nginx
CMD ["nginx", "-g", "daemon off;"]