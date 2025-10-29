#!/usr/bin/env node

/**
 * DeepCode CLI npm发布准备脚本
 * 检查和准备npm发布所需的所有配置
 */

import fs from 'fs';
import path from 'path';

console.log('🚀 DeepCode CLI npm发布准备检查\n');

const checks = [];

// 检查1: package.json配置
function checkPackageJson() {
  console.log('📦 检查 package.json 配置...');
  
  const packagePath = './package.json';
  if (!fs.existsSync(packagePath)) {
    checks.push({ name: 'package.json', status: 'error', message: 'package.json not found' });
    return;
  }
  
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const requiredFields = ['name', 'version', 'description', 'bin', 'files', 'repository'];
  const missing = requiredFields.filter(field => !pkg[field]);
  
  if (missing.length > 0) {
    checks.push({ 
      name: 'package.json', 
      status: 'error', 
      message: `Missing fields: ${missing.join(', ')}` 
    });
  } else if (pkg.private === true) {
    checks.push({ 
      name: 'package.json', 
      status: 'error', 
      message: 'Package is marked as private' 
    });
  } else {
    checks.push({ 
      name: 'package.json', 
      status: 'success', 
      message: `✅ Name: ${pkg.name}, Version: ${pkg.version}` 
    });
  }
}

// 检查2: 可执行文件
function checkExecutableFiles() {
  console.log('🔧 检查可执行文件...');
  
  const executablePath = './deepcode';
  if (!fs.existsSync(executablePath)) {
    checks.push({ 
      name: 'executable', 
      status: 'error', 
      message: 'deepcode executable not found' 
    });
  } else {
    const stats = fs.statSync(executablePath);
    const isExecutable = stats.mode & parseInt('111', 8);
    
    if (!isExecutable) {
      checks.push({ 
        name: 'executable', 
        status: 'warning', 
        message: 'deepcode file exists but may not be executable' 
      });
    } else {
      checks.push({ 
        name: 'executable', 
        status: 'success', 
        message: '✅ deepcode executable ready' 
      });
    }
  }
}

// 检查3: README文件
function checkReadme() {
  console.log('📖 检查 README 文件...');
  
  const readmePath = './README.md';
  if (!fs.existsSync(readmePath)) {
    checks.push({ 
      name: 'README', 
      status: 'error', 
      message: 'README.md not found' 
    });
  } else {
    const readme = fs.readFileSync(readmePath, 'utf8');
    const hasInstallInstructions = readme.includes('npm install') || readme.includes('deepcode-cli');
    
    if (!hasInstallInstructions) {
      checks.push({ 
        name: 'README', 
        status: 'warning', 
        message: 'README may need npm install instructions' 
      });
    } else {
      checks.push({ 
        name: 'README', 
        status: 'success', 
        message: '✅ README with install instructions' 
      });
    }
  }
}

// 检查4: LICENSE文件
function checkLicense() {
  console.log('📄 检查 LICENSE 文件...');
  
  const licensePath = './LICENSE';
  if (!fs.existsSync(licensePath)) {
    checks.push({ 
      name: 'LICENSE', 
      status: 'warning', 
      message: 'LICENSE file not found (recommended for npm)' 
    });
  } else {
    checks.push({ 
      name: 'LICENSE', 
      status: 'success', 
      message: '✅ LICENSE file present' 
    });
  }
}

// 检查5: 豆包功能完整性
function checkDoubaoIntegration() {
  console.log('🤖 检查豆包集成...');
  
  const doubaoFile = './packages/core/src/core/doubaoContentGenerator.ts';
  if (!fs.existsSync(doubaoFile)) {
    checks.push({ 
      name: 'Doubao Integration', 
      status: 'error', 
      message: 'doubaoContentGenerator.ts not found' 
    });
  } else {
    checks.push({ 
      name: 'Doubao Integration', 
      status: 'success', 
      message: '✅ 豆包模型集成文件存在' 
    });
  }
}

// 检查6: 测试脚本
function checkTestScripts() {
  console.log('🧪 检查测试脚本...');
  
  const testFiles = [
    'quick-test-doubao.js',
    'demo-doubao-chat.js', 
    'test-doubao-integration.js'
  ];
  
  const existingTests = testFiles.filter(file => fs.existsSync(file));
  
  if (existingTests.length === 0) {
    checks.push({ 
      name: 'Test Scripts', 
      status: 'warning', 
      message: 'No test scripts found' 
    });
  } else {
    checks.push({ 
      name: 'Test Scripts', 
      status: 'success', 
      message: `✅ ${existingTests.length} test scripts available` 
    });
  }
}

// 运行所有检查
function runAllChecks() {
  checkPackageJson();
  checkExecutableFiles();
  checkReadme();
  checkLicense();
  checkDoubaoIntegration();
  checkTestScripts();
}

// 显示结果
function showResults() {
  console.log('\n📊 检查结果总结:');
  console.log('═'.repeat(50));
  
  let errors = 0;
  let warnings = 0;
  let successes = 0;
  
  checks.forEach(check => {
    const icon = check.status === 'success' ? '✅' : 
                 check.status === 'warning' ? '⚠️' : '❌';
    
    console.log(`${icon} ${check.name}: ${check.message}`);
    
    if (check.status === 'error') errors++;
    else if (check.status === 'warning') warnings++;
    else successes++;
  });
  
  console.log('\n📈 统计:');
  console.log(`✅ 成功: ${successes}`);
  console.log(`⚠️  警告: ${warnings}`);
  console.log(`❌ 错误: ${errors}`);
  
  console.log('\n🎯 npm发布状态:');
  if (errors === 0) {
    console.log('✅ 可以发布到npm！');
    console.log('\n📝 发布命令:');
    console.log('npm publish');
    console.log('\n🔒 如果是首次发布私有包，使用:');
    console.log('npm publish --access public');
  } else {
    console.log('❌ 需要修复错误后才能发布');
    console.log('\n🔧 建议修复:');
    checks.filter(c => c.status === 'error').forEach(c => {
      console.log(`- ${c.name}: ${c.message}`);
    });
  }
  
  if (warnings > 0) {
    console.log('\n💡 改进建议:');
    checks.filter(c => c.status === 'warning').forEach(c => {
      console.log(`- ${c.name}: ${c.message}`);
    });
  }
}

// 主函数
function main() {
  runAllChecks();
  showResults();
}

main();
